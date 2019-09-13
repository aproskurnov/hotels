export function pluralize(count, base, singular, plural1, plural2) {
    return base + ( ( count = (count %= 100) > 20 ? count % 10 : count ) === 0 || count > 4 ? plural2 : count > 1 ? plural1 : singular );
}