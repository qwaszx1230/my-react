//类  在构造函数的参数上使用public等同于创建了同名的成员变量。
export class Student  {
    fullName: string;
    constructor(public firstName: string, public middleName: string, public lastName: string) {
        this.fullName = firstName + " " + middleName + " " + lastName;
    }
}
