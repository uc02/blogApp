import Auth from '../components/Auth';
import Quote from '../components/Quote'
import SignIn from '../components/SignIn';

const Signin = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div>
        <SignIn/>
        {/* <Auth type='signin' /> */}
      </div>
      <div className="hidden lg:block">
          <Quote />
      </div>
    </div>
  )
}

export default Signin;