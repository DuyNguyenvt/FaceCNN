import _ from "lodash";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://mysite.com"
    : "https://mysite.com";

const config = {
  baseUrl,
  staticUrl: `${baseUrl}/static`,
  apiUrl: `${baseUrl}/api`,
  dateFormat: "DD-MM-YYYY",
  currency: "$",
  maxFileSize: 10 * 1024 * 1024, // 10MB
  pageLimit: 10,
  githubPage: true,
  loadAppSettings: (path) => {
    try {
      return _.get(window.engSettings, path, "");
    } catch {
      return "";
    }
  },
};

export default config;
