# Next14 Tutorial
참고영상 : https://www.youtube.com/playlist?list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI

## Dynamic Routes
### Server Side Rest API
route 파일을 사용하여 서버사이드 API를 생성할 수 있다.
- sample source: [src/app/profile/api/route.ts](src/app/profile/api/route.ts)

#### GET Method
```javascript
import {NextRequest} from "next/server";
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("query")
    const filteredComments = query
    ? comments.filter(comment => comment.text.includes(query))
    : comments
    return Response.json(filteredComments)
}
```

#### POST Method
```javascript
export async function POST(request: Request) {
  const comment = await request.json()
  const newComment = {
    id: comments.length + 1,
    text: comment.text
  }
  comments.push(newComment)
  return new Response(JSON.stringify(newComment), {
      headers: {
        "content-type": "application/json"
      },
      status: 201,
    }
  )
}
```

### Redirects
```javascript
import {redirect} from "next/navigation";
export async function GET(
  _request: Request,
  { params } : { params: { id: string }}) {
  if (parseInt(params.id) > comments.length) {
    redirect("/comments")
  }
  const comment = comments.find(
    comment => comment.id === parseInt(params.id)
  )

  return Response.json(comment);
}
```

### Headers
```javascript
export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const headerList = headers();

  console.log('requestHeaders', requestHeaders.get("authorization"))
  console.log('headerList', headerList.get("authorization"));

  return new Response("<h1>Profile API data</h1>", {
    headers: {
      "content-type": "text/html",
    },
  })
}
```

### Cookies
```javascript
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
```

### Cache
GET 요청은 기본적으로 캐싱되기 때문에 dynamic mode를 설정해 Cache를 비활성화 시킬 수 있다.
```javascript
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    time: new Date().toLocaleTimeString()
  })
}
```

### Middleware
```javascript
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  const themePreference = request.cookies.get("theme");
  if (!themePreference) {
    response.cookies.set("theme", "dark");
  }
  
  response.headers.set("custom-header", "custom-value");
  
  return response;
  // if (request.nextUrl.pathname === "/profile") {
  //   return NextResponse.rewrite(new URL("/hello", request.url));
  // }
}
```
# nextjs14-study2
