import { SignIn } from "@clerk/nextjs";

const Page = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <SignIn />
        </div>
    );
};

export default Page;
