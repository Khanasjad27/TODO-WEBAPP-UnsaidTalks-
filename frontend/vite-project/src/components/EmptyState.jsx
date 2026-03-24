import { FiSearch } from "react-icons/fi"

function EmptyState() {

    return (

        <div className="flex flex-col items-center mt-16 text-gray-500">

            <FiSearch className="text-4xl text-orange-500 mb-3" />

            <p>No tasks yet</p>

            <p className="text-sm">Add a task above to get started</p>

        </div>

    )

}

export default EmptyState