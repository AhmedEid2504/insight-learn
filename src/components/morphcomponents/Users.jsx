import { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('contains');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(30);

    useEffect(() => {
        fetch('https://dj-render-ldb1.onrender.com/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Include any other headers your API requires, such as an Authorization header
            },
        })
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error:', error));
    }, []);
    
    const filteredUsers = users.filter(user => {
        const lowerCaseUsername = user.username.toLowerCase();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        switch (filterType) {
            case 'startsWith':
                return lowerCaseUsername.startsWith(lowerCaseSearchTerm);
            case 'endsWith':
                return lowerCaseUsername.endsWith(lowerCaseSearchTerm);
            case 'contains':
            default:
                return lowerCaseUsername.includes(lowerCaseSearchTerm);
        }
    });

    // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col h-[90vh] gap-5 overflow-y-scroll items-center justify-center">
            <div className="flex justify-center gap-5 items-center flex-wrap">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={event => setSearchTerm(event.target.value)}
                    className="p-2 mb-4 border-2 border-c_2 rounded-md"
                />
                <select
                    value={filterType}
                    onChange={event => setFilterType(event.target.value)}
                    className="p-2 mb-4 border-2 border-c_2 rounded-md"
                >
                    <option value="contains">Contains</option>
                    <option value="startsWith">Starts with</option>
                    <option value="endsWith">Ends with</option>
                </select>
            </div>
            <div className="flex flex-wrap h-[80vh] overflow-y-scroll items-center justify-center">
                {currentUsers.map(user => (
                    <div key={user.id} className=" flex flex-col border-2 max-sm:w-[90%] w-full border-c_2 p-4 m-2 rounded-md ">
                        <h2 className="text-xl max-sm:text-[100%] font-bold mb-2">{user.username}</h2>
                        <p className="text-gray-700 max-sm:text-[65%]">{user.email}</p>
                    </div>
                ))}
            </div>
            <div className="pagination flex flex-wrap justify-center  space-x-2 space-y-2 ">
                {Array(Math.ceil(filteredUsers.length / usersPerPage)).fill().map((_, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => paginate(idx + 1)}
                        className={`px-3 py-1 border-2 hover:bg-c_2 hover:text-white border-c_2 rounded-md ${currentPage === idx+1 ? 'bg-c_2 text-white' : ''}`}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Users;