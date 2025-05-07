export const TransitionSidebar = () => {
    return <div className="flex h-screen text-3xl">
        <div className="bg-red-400 transition-all w-0 delay-200 md:w-1/5">
            Sidebar
        </div>
        <div className="bg-green-200 flex-1">
            Content
        </div>
    </div>
}