import { createBrowserHistory } from "history";
const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });
export default history;

// const enhanceHistory = {
//   push: (path) => {
//     history.push(`${process.env.PUBLIC_URL}${path}`);
//   },
// };

// export { enhanceHistory };
