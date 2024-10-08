import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SelectBox from '@/Components/SelectBox';

export default function Edit({ auth, user }) {
    const { data, setData, patch, errors, processing, reset } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        uid: user.uid || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('users.update', user));
    };
    window.Echo.channel('read-rfid-channel').listen('ReadRfidEvent', (e) => {
        if (e.code === 'EXIST') {
            errors.uid = e.message;
            reset('uid');
        } else {
            errors.uid = '';
            setData('uid', e.uid);
        }
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
        >
            <Head title="Create User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Create User</h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Create a new user.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="uid" value="RFID" />

                                    <TextInput
                                        id="uid"
                                        className="mt-1 block w-full"
                                        value={data.uid}
                                        onChange={(e) => setData('uid', e.target.value)}
                                        isFocused
                                        readOnly
                                    />

                                    <InputError className="mt-2" message={errors.uid} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>



                                <div>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        autoComplete="username"
                                    />

                                    <InputError className="mt-2" message={errors.email} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <SelectBox
                                        id="role"
                                        currentValue={data.role}
                                        onChange={(e) => setData('role', e.target.value)}

                                        options={[
                                            { value: 'user', label: 'User' },
                                            { value: 'admin', label: 'Admin' },
                                        ]}
                                    />

                                    <InputError className="mt-2" message={errors.role} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
