import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import Link from "next/link";

const ActionButtons = () => {
    return (
        <div>
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <AlignJustify />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetDescription>
                                <div className="flex flex-col space-y-4 items-start w-full text-lg text-black mt-10">
                                    <Link href="/sign-in">LOGIN</Link>
                                 <div className="flex flex-col space-y-4 items-start w-full text-lg text-black mt-10">
                                   <Link href="/sign-up">SIGN UP</Link> 
                                    {/* Add links for Pricing, Contact, and About as needed */}
                                </div>
                                </div>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden md:flex md:space-x-4">
                <Link href="/sign-in">
                    <Button className="text-md" variant="ghost">
                        Login
                    </Button>
                </Link>
                <Link href="/sign-up">
                    <Button className="text-md bg-blue-500">Sign up</Button>
                </Link>
                {/* Add links for other buttons as needed */}
            </div>
        </div>
    );
};

export default ActionButtons;
