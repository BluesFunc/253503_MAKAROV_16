// Функция-конструктор для базового класса Parcel
function Parcel(sender, recipient, weight, sendDate) {
    this.sender = sender;
    this.recipient = recipient;
    this.weight = weight;
    this.sendDate = new Date(sendDate);
}

// Методы для базового класса Parcel
Parcel.prototype.getSender = function() {
    return this.sender;
};

Parcel.prototype.getRecipient = function() {
    return this.recipient;
};

Parcel.prototype.getWeight = function() {
    return this.weight;
};

Parcel.prototype.getSendDate = function() {
    return this.sendDate;
};

Parcel.prototype.displayInfo = function() {
    return `Отправитель: ${this.sender}, Получатель: ${this.recipient}, Вес: ${this.weight}кг, Дата отправления: ${this.sendDate.toLocaleDateString()}`;
};

// Функция-конструктор для класса-наследника ParcelWithMultipleReceivers
function ParcelWithMultipleReceivers(sender, recipient, weight, sendDate) {
    Parcel.call(this, sender, recipient, weight, sendDate); // Вызываем конструктор родительского класса
}

// Наследуем методы от Parcel
ParcelWithMultipleReceivers.prototype = Object.create(Parcel.prototype);
ParcelWithMultipleReceivers.prototype.constructor = ParcelWithMultipleReceivers;

// Методы для класса-наследника ParcelWithMultipleReceivers

// Метод для фильтрации посылок, отправленных за последний месяц
ParcelWithMultipleReceivers.filterParcelsLastMonth = function(parcels) {
    const currentDate = new Date();
    const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastMonth = new Date(firstDayOfCurrentMonth);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return parcels.filter(parcel => {
        return parcel.getSendDate() >= lastMonth && parcel.getSendDate() <= currentDate;
    });
};

// Метод для группировки посылок по получателям
ParcelWithMultipleReceivers.groupByRecipient = function(parcels) {
    return parcels.reduce((acc, parcel) => {
        const recipient = parcel.getRecipient();
        if (!acc[recipient]) {
            acc[recipient] = [];
        }
        acc[recipient].push(parcel);
        return acc;
    }, {});
};

// Метод для вычисления общего веса посылок каждого получателя
ParcelWithMultipleReceivers.calculateTotalWeightForRecipients = function(parcels) {
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
};

// Метод для добавления новой посылки из формы
ParcelWithMultipleReceivers.addParcelFromForm = function(form) {
    const sender = form.sender.value;
    const recipient = form.recipient.value;
    const weight = parseFloat(form.weight.value);
    const sendDate = form.sendDate.value;

    return new ParcelWithMultipleReceivers(sender, recipient, weight, sendDate);
};

// Метод для вывода всех посылок
ParcelWithMultipleReceivers.displayAllParcels = function(parcels) {
    const allParcelsList = document.getElementById('allParcelsList');
    allParcelsList.innerHTML = '';  // Очищаем список перед выводом

    parcels.forEach(parcel => {
        const listItem = document.createElement('li');
        listItem.textContent = parcel.displayInfo();
        allParcelsList.appendChild(listItem);
    });
};

// Метод для вывода получателей с несколькими посылками
ParcelWithMultipleReceivers.displayMultipleParcels = function(parcels) {
    const multipleParcelsList = document.getElementById('multipleParcelsList');
    multipleParcelsList.innerHTML = '';  // Очищаем список перед выводом

    const recipientsWithMultipleParcels = ParcelWithMultipleReceivers.calculateTotalWeightForRecipients(parcels);
    recipientsWithMultipleParcels.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.recipient} - Общий вес: ${item.totalWeight}кг`;
        multipleParcelsList.appendChild(listItem);
    });
};

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
