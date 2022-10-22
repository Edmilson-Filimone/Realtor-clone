import spinner from "../assets/spinner.svg"

const Spinner = () => {
  return (
    <div className="fixed w-full h-screen flex items-center justify-center bg-black bg-opacity-20">
        <div className="w-[100px]">
            <img src={spinner} alt="Loading..." />
        </div>
    </div>
  )
}

export default Spinner