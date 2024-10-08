import React, { useState } from "react";
import Table from "@/app/_components/table";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";

export default function AccountManagerSection() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAccountManager, setNewAccountManager] = useState({
        name: "",
        position: "",
        account: "",
        site: "San Carlos City",
    });
    const [accountManagers, setAccountManagers] = useState([
        { id: 1, name: "Alice Smith", position: "Operations Manager", account: "Account 001", site: "San Carlos City" },
        { id: 2, name: "Mayeng Miyot", position: "Account Manager", account: "Account 002", site: "Carcar City" },
        { id: 3, name: "John Doe", position: "Team Leader", account: "Account 003", site: "San Carlos City" },
        { id: 4, name: "Emily Johnson", position: "Agent", account: "Account 004", site: "San Carlos City" },
    ]);

    function handleAddNewAccountManagerClick() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNewAccountManager((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newAccountManagerData = {
            id: accountManagers.length + 1,
            ...newAccountManager,
        };

        setAccountManagers((prevManagers) => [...prevManagers, newAccountManagerData]);
        setNewAccountManager({ name: "", position: "", account: "", site: "San Carlos City" });
        handleCloseModal();
    }

    function clickMe(accountId) {
        setAccountManagers((prevManagers) =>
            prevManagers.filter(manager => manager.id !== accountId)
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">
                Account Manager Management
            </h1>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        className="flex items-center justify-center"
                        loading={false}
                        type="button"
                        onClick={handleAddNewAccountManagerClick}
                    >
                        Add New Account Manager
                    </Button>
                </div>

                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={accountManagers}
                    columns={[
                        { title: "Name", key: "name" },
                        { title: "Position", key: "position" },
                        { title: "Account", key: "account" },
                        { title: "Site", key: "site" },
                        {
                            title: "Action",
                            key: "action",
                            render: (_, record) => (
                                <div className="flex space-x-4">
                                    <a href={`/om/agent`} className="text-blue-500 hover:underline">
                                        View Team
                                    </a>
                                    <button
                                        onClick={() => clickMe(record.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ),
                        }
                    ]}
                    isCheckbox={true}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            <Modal open={isModalOpen} setOpen={setIsModalOpen} width="sm:max-w-md top-20">
                <h2 className="text-lg font-semibold mb-4">Add New Account Manager</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            name="name"
                            label="Name"
                            type="text"
                            className="rounded-md w-full"
                            required={true}
                            value={newAccountManager.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            value="Operations Manager"
                            label="Position"
                            name="position"
                            readOnly={true}  
                            className="rounded-md w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <Select
                            options={[
                                { value: 'Account 001', label: 'Account 001' },
                                { value: 'Account 002', label: 'Account 002' },
                                { value: 'Account 003', label: 'Account 003' },
                            ]}
                            value={newAccountManager.account}
                            onChange={(selectedOption) => setNewAccountManager(prev => ({ ...prev, account: selectedOption.value }))}
                            label="Account"
                            name="account"
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="site"
                            label="Site"
                            type="text"
                            className="rounded-md w-full"
                            value={newAccountManager.site}
                            readOnly={true}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button className="flex items-center justify-center w-full" type="submit">
                            Add
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
