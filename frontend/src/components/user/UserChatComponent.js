import "../../chats.css"

const UserChatComponent = () => {
    return (
        <>
            <input type="checkbox" id = "check" />
            <label className="chat-btn" htmlFor="check" >
                <i className="bi bi-chat-dots comment"></i>
                <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                <i className="bi bi-x-circle close"></i>
            </label>
            <div className = "chat-wrapper">
                <div className="chat-header">
                    <h6>Let's chat online</h6>
                </div>
                <div className="chat-form">
                    <div className="chat-msg">
                    {
                        Array.from({length: 20}).map((_, id) => (
                        <div>
                            <p>
                            <b>User: </b> Hello this is just a template
                        </p>
                        <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                            <b>Customer Care: </b> How can we help you?
                        </p>
                        </div>
                        ))
                    }
                        
                    </div>
                    <textarea 
                    id="clientChatMsg"
                    className="form-control"
                    placeholder="Your text message"></textarea>
                    <button className="btn btn-success">Submit</button>
                </div>
            </div>

        </>
    )
}

export default UserChatComponent