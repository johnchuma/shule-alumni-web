import { Modal, Stack } from "react-bootstrap";
import Heading from "./heading";
import CustomButton from "./button";
import Paragraph from "./paragraph";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const DeleteConfirmation = ({show, onHide,deleteFunction}) => {
    const [deleting, setDeleting] = useState(false);
    return ( 
    <Modal className="p-5" show={show} onHide={onHide}>
        <Modal.Header>
            <div className="ms-auto btn" onClick={onHide}>
            <AiOutlineClose  />
            </div>
        </Modal.Header>
        <Modal.Body className="px-4 py-3 text-center">
        <Heading className={`mb-1`} text={"Confirm deletion"}/>
        <Paragraph  text={"Are you sure you want to delete ?"}/>

            <Stack direction="horizontal" className="d-flex justify-content-center mt-5">
               <CustomButton onClick={onHide} className={`me-2 btn-outlined bg-dark w-100 px-5 `} text={"Cancel"}/>
               <CustomButton onClick={async()=>{
                setDeleting(true)
                await deleteFunction()
                // setDeleting(false)
               }} text={"Delete"} loading={deleting} className={"w-100 px-5 ms-2"}/> 
            </Stack>
        </Modal.Body>
    </Modal> 
    );
}
 
export default DeleteConfirmation;