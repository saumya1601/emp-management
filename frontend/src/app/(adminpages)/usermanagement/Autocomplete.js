import { useState, useEffect } from 'react';
import useDebounce from '../app/usermanagement/useDebounce';

function Autocomplete() {
    const [data, setData] = useState(null);

    const loadData = async (event) => {
        const value = event.target.value;
        if (value === '') {
            setData(null);
            return;
        }
        try {

            const response = await fetch('http://localhost:5000/users');
            const allUsers = await response.json();

            const filteredUsers = allUsers.filter(user =>
                user.name.toLowerCase().includes(value.toLowerCase())
            );

            setData(filteredUsers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const loadDataDebounced = useDebounce(loadData, 400);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div>
            <input
                type="text"
                onChange={(e) => loadDataDebounced(e)}
                placeholder="Search users..."
            />
            {data && data.length !== 0 && (
                <div className="results-container">
                    {data.map((item) => (
                        <div key={item.id} className="result-item">
                            <span>{item.name}</span>
                            <span>{item.age}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Autocomplete;
