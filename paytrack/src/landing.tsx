


function Landing(){
    return(
        <div className="h-[130vh]">
        <div className="bg-white/20 backdrop-blur-md h-12 sticky top-5 flex items-center justify-between text-white ml-[10%] mr-[10%] rounded-4xl ">
            <h1 className="ml-7 font-[Roboto] text-2xl">Pesatrack</h1>
            <div className="mr-7">
                <button className="mr-4 hover:text-[#a0a096]  ">Signup</button>
                <button className="hover:text-[#a0a096]  ">Login</button>
            </div>
            </div>
            <div className="text-center mt-6 pt-[20vh] h-[75vh] bg-white/2 ackdrop-blur-md rounded-3xl ml-10 mr-10">
                <h1 className="text-[4.8em] font-[Roboto] ">Track Smarter, Spend Better.</h1>
                <p className="ml-[25%] mr-[25%] text-center text-3xl text-white/40 font-[Rubik] ">Easily track your spending and 
                take control of your money.</p>

                <div className="bg-white/70 ml-[20%] mr-[20%] mt-10 h-[60vh] rounded-2xl pl-4 p-4">
                    <div className="bg-white h-[55vh] rounded-2xl">
                        <button><a href="">Join today</a></button>
                    </div>
                    
                </div>
            </div>
         </div>
    )
}
export default Landing;