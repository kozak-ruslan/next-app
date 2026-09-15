'use client';
import Link from 'next/link';
import React, { FC } from 'react';

type ListProps = {
    key: string;
    name: string;
    desc?: React.ReactNode | string;
    link?: string;
    onClick?: () => void;
};

export const List = ({
    list,
}: {
    list: ListProps[];
}) => {
    if (!list || list?.length === 0)
        return 'empty list';
    return (
        <ul className="w-full p-10">
            {list?.map((item) => (
                <li 
                    className="
                    w-full border m-b-5
                    rounded-xs flex
                    justify-between gap-4 g-sky-500 hover:bg-sky-700"
                    key={item.key}
                >
                    <h4>{item.name}</h4>
                    {item.desc ? (
                        <div className="text-sm text-gray-400">
                            {item.desc}
                        </div>
                    ) : null}
                    {item.link ? (
                        <Link
                            className="underline underline-offset-2 text-red-400"
                            href={
                                item.link
                            }
                        >
                            View Details
                        </Link>
                    ) : item.onClick ? (
                        <button
                            className="text-blue-600 visited:text-purple-600"
                            onClick={
                                item.onClick
                            }
                        >
                            View Details
                        </button>
                    ) : null}
                </li>
            ))}
        </ul>
    );
};
