import type { Page, Request } from 'playwright';
import type { NetworkObservation } from '../models/schemas.js';

const MAX_NETWORK_OBSERVATIONS = 500;
const MAX_URL_LENGTH = 2_048;
const MAX_FAILURE_LENGTH = 1_000;

function record(
  observations: NetworkObservation[],
  observation: NetworkObservation,
): void {
  observations.push(observation);
  if (observations.length > MAX_NETWORK_OBSERVATIONS) {
    observations.splice(0, observations.length - MAX_NETWORK_OBSERVATIONS);
  }
}

function requestDetails(request: Request): Pick<NetworkObservation, 'url' | 'method' | 'resourceType'> {
  return {
    url: request.url().slice(0, MAX_URL_LENGTH),
    method: request.method(),
    resourceType: request.resourceType(),
  };
}

export function observeNetwork(page: Page, observations: NetworkObservation[]): void {
  page.on('request', (request) => {
    record(observations, {
      type: 'request',
      ...requestDetails(request),
      timestamp: new Date().toISOString(),
    });
  });

  page.on('response', (response) => {
    record(observations, {
      type: 'response',
      ...requestDetails(response.request()),
      timestamp: new Date().toISOString(),
      status: response.status(),
    });
  });

  page.on('requestfailed', (request) => {
    const failure = request.failure()?.errorText;
    record(observations, {
      type: 'requestfailed',
      ...requestDetails(request),
      timestamp: new Date().toISOString(),
      ...(failure ? { failure: failure.slice(0, MAX_FAILURE_LENGTH) } : {}),
    });
  });
}