import Quote from '../components/Quote'
import SignUp from '../components/SignUp';

const Signup = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div>
        <SignUp/>
      </div>
      <div className='hidden lg:block'>
          <Quote />
      </div>
    </div>
  )
}

export default Signup;