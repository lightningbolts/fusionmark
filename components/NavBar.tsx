export default function NavBar() {
    return (
        <nav className="flex items-center justify-between w-full h-24 px-8 bg-gray-100 dark:bg-zinc-800/30">
            <div className="flex items-center gap-4">
                <a href="/" className="font-bold text-lg">Home</a>
                <a href="/bench" className="font-bold text-lg">Bench</a>
            </div>
            <div className="flex items-center gap-4">
                <a href="https://nextjs.org/docs" className="font-bold text-lg">Docs</a>
                <a href="" className={"font-bold text-lg"}>GitHub</a>
            </div>
        </nav>
    );
}