export function formatLocaleDateTime(dt: string): string {
    const d = new Date(dt);

    const day = d.toLocaleDateString("id-ID", { day: "numeric" });
    const month = d.toLocaleDateString("id-ID", { month: "long" });
    const year = d.toLocaleDateString("id-ID", { year: "numeric" });
    const time = d.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).replace('.', ':');

    return `${day} ${month} ${year} ${time} WIB`;
}
