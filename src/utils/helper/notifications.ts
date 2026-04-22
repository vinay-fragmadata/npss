import { ERROR_MESSAGES } from "../../configs/messages";

/** DOM event name used to broadcast snackbar-style notifications. */
export const NOTIFICATION_EVENT_NAME = "SHOW_NOTIFICATION" as const;

/**
 * Notification severities; string enum values match the existing event contract.
 */
export enum NotificationType {
  Success = "success",
  Warning = "warning",
  Info = "info",
  Error = "error",
}

/** Payload attached to {@link NOTIFICATION_EVENT_NAME} custom events. */
export interface NotificationDetail {
  readonly id: number;
  readonly message: string;
  readonly type: NotificationType;
}

/**
 * Coerces input to the message string stored on the event.
 * Non-strings become `""` (same behavior as the previous implementation).
 */
function normalizeMessage(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/**
 * Builds the notification payload. Pure (no DOM / side effects).
 */
export function createNotificationDetail(
  message: unknown,
  type: NotificationType
): NotificationDetail {
  return {
    id: Date.now(),
    message: normalizeMessage(message),
    type,
  };
}

/**
 * Dispatches the notification custom event.
 */
function dispatchNotificationEvent(detail: NotificationDetail): boolean {
  const event = new CustomEvent<NotificationDetail>(NOTIFICATION_EVENT_NAME, {
    detail,
  });
  return document.dispatchEvent(event);
}

/**
 * Displays an error notification. Defaults to {@link ERROR_MESSAGES.internal_error}.
 */
export const showErrorMsg = (
  message: string = ERROR_MESSAGES.internal_error
): void => {
  dispatchNotificationEvent(
    createNotificationDetail(message, NotificationType.Error)
  );
};

/**
 * Displays a success notification.
 * `null` / `undefined` yield an empty message (defensive for runtime callers).
 */
export const showSuccessMsg = (message: string | null | undefined): void => {
  dispatchNotificationEvent(
    createNotificationDetail(message, NotificationType.Success)
  );
};

/**
 * Displays a warning notification.
 */
export const showWarnMsg = (message: string | null | undefined): void => {
  dispatchNotificationEvent(
    createNotificationDetail(message, NotificationType.Warning)
  );
};

/**
 * Displays an informational notification.
 */
export const showInfoMsg = (message: string | null | undefined): void => {
  dispatchNotificationEvent(
    createNotificationDetail(message, NotificationType.Info)
  );
};

/**
 * Formats and dispatches a {@link NOTIFICATION_EVENT_NAME} notification event.
 *
 * @returns Whether the event was not canceled (same as {@link Document.dispatchEvent}).
 */
export const showNotification = (
  message: string | null | undefined,
  type: NotificationType
): boolean => {
  return dispatchNotificationEvent(
    createNotificationDetail(message, type)
  );
};
