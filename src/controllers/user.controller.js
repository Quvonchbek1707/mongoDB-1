import userService from "../services/user.service.js";

class UserController {
    async POST(req, res) {
        try {
            const { name, email } = req.body;
            if (!name || !email) {
                return res.status(400).json({
                    success: false,
                    message: "Name and email are required",
                });
            }

            const existingUser = await userService.GETBYEMAIL(email);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User with this email already exists",
                });
            }

            const data = await userService.POST(req.body);
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async GET(req, res) {
        try {
            const data = await userService.GET();
            res.status(200).json({
                success: true,
                count: data.length,
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async GETONE(req, res) {
        try {
            const data = await userService.GETONE(req.params.id);
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async PUT(req, res) {
        try {
            const data = await userService.PUT(req.params.id, req.body);
            if (data.matchedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async DEL(req, res) {
        try {
            const data = await userService.DEL(req.params.id);
            if (data.deletedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new UserController();