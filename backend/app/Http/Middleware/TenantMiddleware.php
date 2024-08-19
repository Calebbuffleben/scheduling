<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TenantMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $domain = $request->getHost();
        //$tenant = Tenant::where('domain', $domain)->first();

        /*if ($tenant) {
            abort(404, 'Tenant not found.');
        }*/

        // Set the tenant globally
        //app()->instance(Tenant::class, $tenant);

        return $next($request);
    }
}
