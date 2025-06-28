export function Modal({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <>
            <dialog id={id} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">{title}</h3>
                    <div>{children}</div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}