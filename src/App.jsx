import { useEffect, useState } from 'react';
import { FaCalendar, FaEnvelope, FaLock, FaMapMarked, FaPhone, FaUser } from 'react-icons/fa';
const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/21.jpg';
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random person');

  const fetchPerson = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const person = data.results[0];
      const { phone, email } = person;
      const { large: image } = person.picture;
      const { password } = person.login;
      const { first, last } = person.name;
      const {
        dob: { age },
      } = person;
      const {
        street: { number, name },
      } = person.location;
      const newPerson = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
      };
      setPerson(newPerson);
      setTitle('name');
      setValue(newPerson.name);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main className='h-screen flex flex-col w-full'>
      <div className='bg-blue-300 h-96 bg-opacity-50'></div>
      <div className='flex flex-col -mt-48'>
        <div className='flex flex-col items-center justify-center max-w-screen-md w-full mx-auto bg-white rounded-md shadow-md p-4'>
          <img
            src={(person && person.image) || defaultImage}
            alt='random user'
            className='w-32 h-32 outline-4 outline outline-blue-300 rounded-full mb-2'
          />
          <p className='text-4xl m-1 text-blue-900 font-bold capitalize'>{(person && person.name) || 'john doe'}</p>
          <p className='text-xl font-medium text-blue-500 capitalize m-1'>{(person && person.job) || 'developer'}</p>
          <p className='text-xl font-medium text-blue-500 capitalize m-1'>{value}</p>

          <div className='my-8 flex space-x-12'>
            <button
              className='bg-blue-200 px-5 py-2.5 rounded-md shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-blue-600 icon'
              data-label='name'
              onMouseOver={handleValue}
            >
              <FaUser size={24} />
            </button>
            <button
              className='bg-blue-200 px-5 py-2.5 rounded-md shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-600 icon'
              data-label='email'
              onMouseOver={handleValue}
            >
              {' '}
              <FaEnvelope size={24} />
            </button>
            <button
              className='bg-blue-200 px-5 py-2.5 rounded-md shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-600 icon'
              data-label='age'
              onMouseOver={handleValue}
            >
              <FaCalendar size={24} />
            </button>
            <button
              className='bg-blue-200 px-5 py-2.5 rounded-md shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-600 icon'
              data-label='street'
              onMouseOver={handleValue}
            >
              <FaMapMarked size={24} />
            </button>
            <button
              className='bg-blue-200 px-5 py-2.5 rounded-md shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-600 icon'
              data-label='phone'
              onMouseOver={handleValue}
            >
              <FaPhone size={24} />
            </button>
            <button
              className='bg-blue-200 px-5 py-2.5 rounded-md shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-600 icon'
              data-label='password'
              onMouseOver={handleValue}
            >
              <FaLock size={24} />
            </button>
          </div>
          <button
            className='bg-blue-200 px-5 py-2.5 rounded-md shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 capitalize '
            onClick={fetchPerson}
          >
            {isLoading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
