const EmptyState = () => {
  return (
    <div
        className="
            px-4
            py-10
            sm:px-6
            lg:px-8
            h-full
            flex
            justify-center
            items-center
            bg-gray-200
        "
    >
        <div className="text-center items-center flex flex-col">
            <h3
                className="
                    mt-2
                    text-5xl
                    font-semibold
                    text-blue-600
                "
            >
                Welcome Webloom,
            </h3>
            <h3
                className="
                    mt-2
                    text-2xl
                    font-semibold
                    text-gray-900
                "
            >
                Start a new conversation with webloom members.
            </h3>
        </div>
    </div>
  )
}

export default EmptyState