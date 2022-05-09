function Home() {
    return (
        <div>
        <p className="text-xxxl py-5 text-slate-400">Welcome to a web page for booking transport!</p>
            {localStorage.getItem("user") == undefined ? 
                (<></>) : 
                (
                    <div>
                        <div>{JSON.parse(localStorage.getItem("user")).username}</div>
                        <div>{JSON.parse(localStorage.getItem("token"))}</div>
                    </div>
                )
                }
            {/*<ScrollMenu>

            </ScrollMenu>*/}
        </div>

    );
}

export default Home;