import MyButton from '../layout/MyButton';

const ToggleButton = (props) => {
    
  return (
    <div>
        <MyButton onClick={props.handleToggleButton}  class="toggle_button">{props.signup?'Have an account?Login':'Don\'t have an account?Signup'}</MyButton>
    </div>
  )
}

export default ToggleButton