import {
  isNotFound,
  isRedirect,
  SearchParamError,
} from "@tanstack/react-router";

export function shouldReportRouteError(error: unknown) {
  if (isRedirect(error) || isNotFound(error)) {
    return false;
  }

  if (error instanceof SearchParamError) {
    return false;
  }

  return true;
}
