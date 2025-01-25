import { createServerClient } from "@supabase/ssr";

type UserRole = {
  roles: {
    role_name: string;
  };
};
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No user, potentially respond by redirecting the user to the login page
  if (!user && !request.nextUrl.pathname.startsWith("/auth")) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  if (user) {
    const userId = user.id;

    const { data: userRoles, error } = (await supabase
      .from("user-roles")
      .select("roles (role_name)")
      .eq("user_id", userId)) as { data: UserRole[] | null; error: any };

    if (error || !userRoles || userRoles.length === 0) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/forbidden";
      return NextResponse.redirect(url);
    }

    const roles = userRoles.map((role) => role.roles.role_name);

    const adminRoutes = ["/admin", "/admin/dashboard"];
    const staffRoutes = ["/staff", "/staff/dashboard"];

    if (roles.includes("user")) {
      if (adminRoutes.includes(request.nextUrl.pathname) || staffRoutes.includes(request.nextUrl.pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = "/auth/forbidden";
        return NextResponse.redirect(url);
      }
    }

    if (adminRoutes.includes(request.nextUrl.pathname) && !roles.includes("admin")) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/forbidden";
      return NextResponse.redirect(url);
    }

    if (staffRoutes.includes(request.nextUrl.pathname) && !roles.includes("staff")) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/forbidden";
      return NextResponse.redirect(url);
    }

    const response = NextResponse.next();
    response.headers.set("user-id", userId);
    response.headers.set("user-roles", roles.join(","));
    return response;
  }

  return supabaseResponse;
}