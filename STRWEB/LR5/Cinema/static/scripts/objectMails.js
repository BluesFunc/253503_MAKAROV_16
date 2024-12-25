// Базовый класс для представления почтовой посылки
class Parcel {
    constructor(sender, recipient, weight, sendDate) {
        this.sender = sender;
        this.recipient = recipient;
        this.weight = weight;
        this.sendDate = new Date(sendDate);
    }

    // Геттеры для получения данных
    getSender() {
        return this.sender;
    }

    getRecipient() {
        return this.recipient;
    }

    getWeight() {
        return this.weight;
    }

    getSendDate() {
        return this.sendDate;
    }

    // Метод для отображения информации о посылке
    displayInfo() {
        return `Отправитель: ${this.sender}, Получатель: ${this.recipient}, Вес: ${this.weight}кг, Дата отправления: ${this.sendDate.toLocaleDateString()}`;
    }
}

// Класс-наследник для работы с посылками за последний месяц
class ParcelWithMultipleReceivers extends Parcel {
    constructor(sender, recipient, weight, sendDate) {
        super(sender, recipient, weight, sendDate);
    }

    // Метод для фильтрации посылок, отправленных за последний месяц
    static filterParcelsLastMonth(parcels) {
        const currentDate = new Date();
        const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastMonth = new Date(firstDayOfCurrentMonth);
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        return parcels.filter(parcel => {
            return parcel.getSendDate() >= lastMonth && parcel.getSendDate() <= currentDate;
        });
    }

    // Метод для группировки посылок по получателям
    static groupByRecipient(parcels) {
        return parcels.reduce((acc, parcel) => {
            const recipient = parcel.getRecipient();
            if (!acc[recipient]) {
                acc[recipient] = [];
            }
            acc[recipient].push(parcel);
            return acc;
        }, {});
    }

    // Метод для вычисления общего веса посылок каждого получателя
    static calculateTotalWeightForRecipients(parcels) {
        const groupedByRecipient = ParcelWithMultipleReceivers.groupByRecipient(parcels);
        const result = [];

        for (const recipient in groupedByRecipient) {
            const recipientParcels = groupedByRecipient[recipient];
            if (recipientParcels.length > 1) {
                const totalWeight = recipientParcels.reduce((sum, parcel) => sum + parcel.getWeight(), 0);
                result.push({ recipient, totalWeight });
            }
        }
        return result;
    }

    // Метод для добавления новой посылки из формы
    static addParcelFromForm(form) {
        const sender = form.sender.value;
        const recipient = form.recipient.value;
        const weight = parseFloat(form.weight.value);
        const sendDate = form.sendDate.value;

        return new ParcelWithMultipleReceivers(sender, recipient, weight, sendDate);
    }

    // Метод для вывода всех посылок
    static displayAllParcels(parcels) {
        const allParcelsList = document.getElementById('allParcelsList');
        allParcelsList.innerHTML = '';  // Очищаем список перед выводом

        parcels.forEach(parcel => {
            const listItem = document.createElement('li');
            listItem.textContent = parcel.displayInfo();
            allParcelsList.appendChild(listItem);
        });
    }

    // Метод для вывода получателей с несколькими посылками
    static displayMultipleParcels(parcels) {
        const multipleParcelsList = document.getElementById('multipleParcelsList');
        multipleParcelsList.innerHTML = '';  // Очищаем список перед выводом

        const recipientsWithMultipleParcels = ParcelWithMultipleReceivers.calculateTotalWeightForRecipients(parcels);
        recipientsWithMultipleParcels.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.recipient} - Общий вес: ${item.totalWeight}кг`;
            multipleParcelsList.appendChild(listItem);
        });
    }
}

// Массив для хранения посылок
const parcels = [];

// Слушаем отправку формы
document.getElementById('parcelForm').addEventListener('submit', (event) => {
    event.preventDefault();  // Отключаем стандартное поведение формы (перезагрузку страницы)

    // Добавляем новую посылку в массив
    const newParcel = ParcelWithMultipleReceivers.addParcelFromForm(event.target);
    parcels.push(newParcel);

    // Отображаем все посылки и результаты
    ParcelWithMultipleReceivers.displayAllParcels(parcels);
    ParcelWithMultipleReceivers.displayMultipleParcels(parcels);
});
