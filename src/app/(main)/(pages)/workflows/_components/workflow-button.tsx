'use client'

import WorkflowForm from "@/components/forms/workflow-form";
import CustomModal from "@/components/global/custom-modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import { useBilling } from '@/providers/billing-provider'
import { Plus } from "lucide-react";


const WorkflowButton = () => {
    const { setOpen, setClose } = useModal()
    const { credits } = useBilling()

    const handleClick = () => {
        setOpen(
            <CustomModal
                title="Create a Workflow Automation"
                subheading="Workflows are a powerfull that help you automate tasks."
            >
                <WorkflowForm />
            </CustomModal>
        )
    }

    return ( 
        <Button
            size={"icon"}
            {...(credits !== '0'
        ? {
            onClick: handleClick,
          }
        : {
            disabled: true,
          })}
        >   
            <Plus />
        </Button>
     );
}
 
export default WorkflowButton;