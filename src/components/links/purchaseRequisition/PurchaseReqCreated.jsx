import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function PurchaseReqCreated() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-80">
      <div className="max-w-80">
        <div className="text-center mb-6">Purchase Requisition Created</div>
        <Button
          className="w-full bg-red-800 hover:bg-red-800/90 text-white"
          onClick={() => navigate(`/purchase/`)}
        >
          Go to Purchase Requisitions
        </Button>
      </div>
    </div>
  );
}
