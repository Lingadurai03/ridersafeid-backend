export interface RTKError {
    status: number;
    data: {
        error: string;
        message: string;
    };
}
