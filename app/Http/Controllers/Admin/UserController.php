<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', Auth::id())->get();


        return inertia('Admin/Users/UserManagement', [
            'users' => $users
        ]);
    }

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8|confirmed',
        'role' => 'required|string',
        'photo' => 'nullable|image|max:2048',
    ]);

    $photoPath = null;

    if ($request->hasFile('photo')) {
        // Store file inside storage/app/public/photos
        $photoPath = $request->file('photo')->store('photos', 'public');
    }

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
        'role' => $request->role,
        'photo' => $photoPath, // ✅ Now we save it to DB
    ]);

    return redirect()->route('admin.users.index');
}



    public function edit(User $user)
    {
        return inertia('Admin/Users/EditUser', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|confirmed|min:8',
            'role' => 'required|string|in:admin,faculty,technician,guest',
            
        ]);

        if ($validated['password']) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        if (Auth::id() === $user->id) {
            return back()->withErrors(['error' => 'You cannot delete your own account.']);
        }

        $user->delete();
        return redirect()->back()->with('success', 'User deleted successfully.');
    }

    public function show(User $user)
    {
        return Inertia::render('Admin/Users/ShowUsers', [
            'user' => $user
        ]);
    }

}
