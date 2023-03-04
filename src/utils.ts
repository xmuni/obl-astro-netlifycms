export function matchesPathname(path: string, pathname: string) {
    // console.log('Comparing pathname:', {path,pathname})
    if(pathname.endsWith('/')) {
        return pathname === path || pathname === path+'/'
    }
    else {
        return pathname === path
    }
}

export function sanitizeSlug(slug: string) {
    return slug.trim().replaceAll(' ','-').toLowerCase()
}