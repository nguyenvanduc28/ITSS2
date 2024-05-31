function randomTimeRange() {
    const currentDate = new Date(); // Lấy ngày hiện tại

    // Sinh ngẫu nhiên một số từ 0 đến 6 để đại diện cho các ngày trong tuần (0: Chủ nhật, 1: Thứ 2, 2: Thứ 3, ...)
    const randomDayOfWeek = Math.floor(Math.random() * 7);

    // Tính toán ngày bắt đầu và kết thúc dựa trên ngày hiện tại và randomDayOfWeek
    const startDay = currentDate.getDate() + randomDayOfWeek;
    const endDay = startDay;

    // Lấy thời gian bắt đầu trong ngày
    const startHour = Math.floor(Math.random() * 24); // Giờ bắt đầu (0-23)
    const startMinute = Math.floor(Math.random() * 60); // Phút bắt đầu (0-59)
    const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), startDay, startHour, startMinute);

    // Lấy thời gian kết thúc trong ngày
    const endHour = startHour + Math.floor(Math.random() * (24 - startHour)); // Giờ kết thúc lớn hơn hoặc bằng giờ bắt đầu
    const endMinute = Math.floor(Math.random() * 60); // Phút kết thúc (0-59)
    const endTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), endDay, endHour, endMinute);

    return {
        start: startTime.toString().substring(0,15),
        end: endTime.toString().substring(0,15)
    };
}
const task = [
    {
        id: 2,
        workspace: "School",
        project: "E-Commerce Website",
        name: 'Database design',
        priority: 'High',
        status: 'Submitted',
        detail: 'Design the database schema. Optimize data storage and retrieval.',
        assignee: ['Hoàng Vân Trường', 'Trần Khắc Tuân'],
        comment: [
            {
                name: 'Nguyễn Trọng Quang',
                detail: 'Great work! Looking forward to working with this design.',
            },
        ],
        ...randomTimeRange()
    },
    {
        id: 7,
        name: 'Order management system',
        workspace: "Company",
        project: 'E-Commerce Website',
        priority: 'High',
        status: 'Submitted',
        detail: 'Develop a system to manage and track customer orders. Handle order processing and status updates.',
        assignee: ['Hoàng Vân Trường', 'Trần Khắc Tuân'],
        comment: [
            {
                name: 'Nguyễn Trọng Quang',
                detail: 'I think there is something wrong, check my note in the code',
            },
        ],
        ...randomTimeRange()
    },
    {
        project: 'E-Commerce Website',
        id: 4,
        workspace: "Company",
        name: 'User authentication',
        detail: 'Create a secure authentication system for users. Handle login, registration, and password recovery.',
        priority: 'Medium',
        status: 'Completed',
        assignee: ['Hoàng Vân Trường'],
        point: '90',
        comment: [
            {
                name: 'Nguyễn Trọng Quang',
                detail: 'The authentication system works great! I am glad we were able to get it done so quickly.',
            },
        ],
        ...randomTimeRange(),
    },
    {
        id: 9,
        project: 'Messaging Application',
        name: 'Message archiving',
        workspace: "Home",
        detail:
            'Develop a system to archive and store messages. Allow users to access and retrieve past conversations.',
        priority: 'Low',
        status: 'In Progress',
        assignee: ['Hoàng Vân Trường'],
        comment: [
            {
                name: 'Nguyễn Trọng Quang',
                detail: 'I can help you with this task if you need.',
            },
        ],
        ...randomTimeRange(),

    },
    {
        id: 10,
        project: 'Messaging Application',
        name: 'Deployment',
        workspace: "Home",
        detail: 'Deploy the messaging application to production. Ensure that the application is available to users.',
        priority: 'High',
        status: 'In Progress',
        assignee: ['Lê Duy Quý', 'Hoàng Vân Trường'],
        comment: [
            {
                name: 'Nguyễn Trọng Quang',
                detail: 'This is a critical task, we need to get it done as soon as possible!',
            },
        ],
        ...randomTimeRange(),

    },
    {
        id: 10,
        project: 'AI Chat Application',
        name: 'Continuous learning',
        workspace: "School",
        detail:
            'Enable the chatbot to learn from user interactions and improve over time. Implement feedback loops and model retraining.',
        priority: 'High',
        status: 'Completed',
        assignee: ['Lê Duy Quý', 'Hoàng Vân Trường'],
        point: '70',
        comment: [
            {
                name: 'Nguyễn Trọng Quang',
                detail:
                    'The chatbot is now learning from user interactions and improving over time. This is a great feature!',
            },
        ],
        ...randomTimeRange(),
    },
]
export default task;