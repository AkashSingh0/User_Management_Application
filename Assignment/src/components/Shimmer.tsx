
function Shimmer() {
    return (
        <div className='h-full w-full p-5'>
            <table className="w-full h-auto border-collapse border border-gray-300 text-white">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="p-3 border border-gray-500">Name</th>
                        <th className="p-3 border border-gray-500">Phone</th>
                        <th className="p-3 border border-gray-500">Company</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(7)].map((_, index) => (
                        <tr key={index} className="odd:bg-gray-700 even:bg-gray-600">
                            {[...Array(3)].map((_, cellIndex) => (
                                <td key={cellIndex} className="p-3 border border-gray-500">
                                    <div className="h-4 bg-gray-400 rounded-md shimmer" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Shimmer;
