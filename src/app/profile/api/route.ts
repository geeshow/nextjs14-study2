import {NextRequest} from "next/server";
import {headers, cookies} from "next/headers";

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const headerList = headers();
  
  cookies().set("resultsPerPage", "20");
  const theme = request.cookies.get("theme")
  console.log('requestHeaders', requestHeaders.get("authorization"))
  console.log('headerList', headerList.get("authorization"));
  console.log('cookie1', theme);
  console.log('cookie2', cookies().get("resultsPerPage"));
  
  return new Response("<h1>Profile API data</h1>", {
    headers: {
      "content-type": "text/html",
      "Set-Cookie": "theme=dark",
    },
  })
}
