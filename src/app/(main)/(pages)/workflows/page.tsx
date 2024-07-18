import Workflows from "./_components";
import WorkflowButton from "./_components/workflow-button";

const WorkflowsPage = () => {
    return ( 
        <div className="flex flex-col relative" >
            <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between " > 
                Worflows
                <WorkflowButton />
            </h1>
            <Workflows />
        </div>
     );
}
 
export default WorkflowsPage;