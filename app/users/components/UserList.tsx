'use client';

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";

interface UserListProps {
    items: User[]
};

const UserList: React.FC<UserListProps> = ({
    items
}) => {
    // function handleClick(event: MouseEvent<HTMLDivElement, MouseEvent>): void {
    //     throw new Error("Function not implemented.");
    // }

    return (
        <aside
            className="
                fixed
                inset-y-0
                pb-20
                lg:pb-0
                lg:left-20
                lg:w-80
                lg:block
                overflow-y-auto
                border-r
                border-gray-200
                block
                w-full
                left-0
            "
        >
            <div className="px-5">
                <div className="flex-col">
                    <div
                        className="
                            text-2xl
                            font-bold
                            text-neutral-800
                            py-4
                        "
                    >
                        Members
                    </div>
                </div>
                {items.map((item) => (
                    <UserBox 
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
            <div className="px-5">
                <div className="flex-col">
                    <div
                        className="
                            text-2xl
                            font-bold
                            text-neutral-800
                            py-4
                        "
                    >
                        AI Bots
                    </div>
                </div>
                {/* {isLoading && (
            <LoadingModal />
        )} */}
        <div
            //onClick={handleClick}
            className="
                w-fill
                relative
                flex
                items-center
                space-x-3
                bg-white
                p-3
                hover:bg-neutral-100
                rounded-lg
                transition
                cursor-pointer
            "
        >
            
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div
                        className="
                            flex
                            justify-between
                            items-center
                            mb-1
                        "
                    >
                        <p
                            className="
                                text-sm
                                font-medium
                                text-gray-900
                            "
                        >
                            Zinc Bot
                        </p>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </aside>
    );
}

export default UserList;