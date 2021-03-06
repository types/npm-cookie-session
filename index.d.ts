import { IncomingMessage, ServerResponse } from 'http';

declare function cookieSession (options: cookieSession.Options): (req: IncomingMessage, res: ServerResponse, next: (err?: Error) => void) => void;

declare namespace cookieSession {
  export interface Options {
    /**
     * The name of the cookie to set, defaults to `session`.
     */
    name?: string;

    /**
     * The list of keys to use to sign & verify cookie values. Set cookies are always signed with `keys[0]`, while the other keys are valid for verification, allowing for key rotation.
     */
    keys?: Array<string>;

    /**
     * A string which will be used as single key if `keys` is not provided.
     */
    secret?: string;

    /**
     * a number representing the milliseconds from `Date.now()` for expiry.
     */
    maxAge?: number;

    /**
     * a `Date` object indicating the cookie's expiration date (expires at the end of session by default).
     */
    expires?: Date;

    /**
     * a string indicating the path of the cookie (`/` by default).
     */
    path?: string;

    /**
     * a string indicating the domain of the cookie (no default).
     */
    domain?: string;

    /**
     * a boolean indicating whether the cookie is only to be sent over HTTPS (`false` by default for HTTP, `true` by default for HTTPS).
     */
    secure?: boolean;

    /**
     * a boolean indicating whether the cookie is only to be sent over HTTPS (use this if you handle SSL not in your node process).
     */
    secureProxy?: boolean;

    /**
     * a boolean indicating whether the cookie is only to be sent over HTTP(S), and not made available to client JavaScript (`true` by default).
     */
    httpOnly?: boolean;

    /**
     * a boolean indicating whether the cookie is to be signed (true by default). If this is true, another cookie of the same name with the .sig suffix appended will also be sent, with a 27-byte url-safe base64 SHA1 value representing the hash of cookie-name=cookie-value against the first Keygrip key. This signature key is used to detect tampering the next time a cookie is received.
     */
    signed?: boolean;

    /**
     * a boolean indicating whether to overwrite previously set cookies of the same name (`true` by default). If this is true, all cookies set during the same request with the same name (regardless of path or domain) are filtered out of the Set-Cookie header when setting this cookie.
     */
    overwrite?: boolean;
  }

  export interface SessionData {
    /**
     * Is `true` if the session has been changed during the request.
     */
    isChanged: boolean;

    /**
     * Is `true` if the session is new.
     */
    isNew: boolean;

    /**
     * Determine if the session has been populated with data or is empty.
     */
    isPopulated: boolean;
  }

  /**
   * **Important**: The session signature has `null` because the setter allows 
   * `null` to destroy the session (see https://github.com/expressjs/cookie-session#destroying-a-session).
   * If you need to read the session, consider using the "non-null assertion operator" 
   * (`req.session!.x`) until TypeScript can define different getters and setters.
   */
  export type Session <T extends object> = undefined | null | (T & SessionData);
}


export = cookieSession;
