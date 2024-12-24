import Link from "next/link";

const AddClassButton = () => {
    return (
        <Link href="/class/create">
            <button className="border border-gray-500 px-4 py-2 rounded">Add Class</button>
        </Link>
    );
}
export default AddClassButton;