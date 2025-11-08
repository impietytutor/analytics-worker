/**
 * parser.js
 *
 * This module provides functions for parsing different types of analytics data payloads.
 */

/**
 * Parses a JSON string and returns a JavaScript object.
 * Handles potential JSON parsing errors gracefully.
 *
 * @param {string} jsonString - The JSON string to parse.
 * @returns {object|null} - The parsed JavaScript object, or null if parsing fails.
 */
export function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

/**
 * Parses a URL-encoded string and returns a JavaScript object.
 *
 * @param {string} queryString - The URL-encoded string to parse.
 * @returns {object} - The parsed JavaScript object.
 */
export function parseQueryString(queryString) {
  const params = {};
  const pairs = queryString.slice(queryString.indexOf('?') + 1).split('&');

  for (const pair of pairs) {
    if (!pair) continue; // Skip empty pairs

    const [key, value] = pair.split('=').map(decodeURIComponent);
    if (key) {
      params[key] = value || ''; // Handle keys without values
    }
  }

  return params;
}

/**
 * Parses a user agent string and extracts device information.
 *
 * @param {string} userAgentString - The user agent string to parse.
 * @returns {object} - An object containing device information (e.g., os, browser).
 */
export function parseUserAgent(userAgentString) {
  const userAgent = userAgentString.toLowerCase();

  let os = "Unknown OS";
  if (userAgent.includes("windows nt")) {
    os = "Windows";
  } else if (userAgent.includes("mac os x")) {
    os = "macOS";
  } else if (userAgent.includes("android")) {
    os = "Android";
  } else if (userAgent.includes("linux")) {
    os = "Linux";
  }

  let browser = "Unknown Browser";
  if (userAgent.includes("chrome")) {
    browser = "Chrome";
  } else if (userAgent.includes("firefox")) {
    browser = "Firefox";
  } else if (userAgent.includes("safari")) {
    browser = "Safari";
  } else if (userAgent.includes("edge")) {
    browser = "Edge";
  } else if (userAgent.includes("msie") || userAgent.includes("trident")) {
    browser = "Internet Explorer";
  }

  return { os, browser };
}

/**
 * Parses a CSV string into an array of objects.  Assumes first line is the header.
 *
 * @param {string} csvString - The CSV string to parse.
 * @param {string} [delimiter=','] - The delimiter used in the CSV string. Defaults to comma.
 * @returns {Array<object>} - An array of objects, where each object represents a row in the CSV.  Returns empty array on error.
 */
export function parseCSV(csvString, delimiter = ',') {
  try {
    const lines = csvString.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(delimiter).map(header => header.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(delimiter).map(value => value.trim());
      if (values.length !== headers.length) {
        console.warn(`CSV row ${i + 1} has incorrect number of columns. Skipping.`);
        continue;
      }

      const row = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j];
      }
      data.push(row);
    }

    return data;
  } catch (error) {
    console.error("Error parsing CSV:", error);
    return [];
  }
}