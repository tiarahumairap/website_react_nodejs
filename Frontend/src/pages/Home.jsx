import image from '../assets/images/library.jpg'

export default function Home(){
    return(
        <div className="shadow rounded-4 m-4 p-4">
            <div className="row mb-4" >
                <div className="col-sm-6 col-md-6">
                    <img className="w-100 rounded-5" src={image} alt="School"/>
                </div>
                <div className="col-sm-6 col-md-6">
                    <h1 className='mt-4 fw-bold p-3' style={{fontFamily: "Roboto"}}>Lorem Ipsum is a type of dummy text</h1>
                    <p className='mt-5 p-4'>Lorem Ipsum is a type of dummy text commonly used in the printing and typesetting industry. It has been the industry's standard since the 1500s, when an unknown printer scrambled a galley of type to create a type specimen book. Essentially, Lorem Ipsum is a sequence of Latin words that do not form coherent sentences, making it useful for filling spaces in design layouts where actual text will eventually be placed. It serves as a placeholder in graphic design, publishing, and web development, allowing designers to focus on layout and visual elements without being distracted by meaningful content.</p>
                </div>
            </div>
        </div>
    )
}
