// Membuat Program Penyewaan Lapangan Futsal/Bola
// Menggunakan MongoDB

// Membuat Collections di dalam database sewa_lapangan
// Membuat Collection customers
db.createCollection('customers');
// Membuat Collection Lapangan
db.createCollection('lapangan');
// Membuat Collection Orders
db.createCollection('orders');
// Collections customers, lapangan dan orders berhasil dibuat

// Insert document to customers collections
db.customers.insertMany([
    {
        _id: "pb",
        team_name: "Persib",
        asal: "Bekasi"
    },
    {
        _id: "pj",
        team_name: "Persija",
        asal: "Jakarta"
    },
    {
        _id: "pss",
        team_name: "PSS Seleman",
        asal: "Seleman"
    },
    {
        _id: "bu",
        team_name: "Bali United",
        asal: "Bali"
    },
    {
        _id: "psb",
        team_name: "PSB Bogor",
        asal: "Bogor"
    }
]);

// Update 1 (single) data at customers collections
db.customers.updateOne(
    {_id: "pb"}, 
    {$set: {asal: "Bandung"}}
)

// Delete 1 (single) data at Customers Collections
db.customers.remove(
    {asal: "Seleman"}
);

// Insert document to lapangan collections
db.lapangan.insertMany([
    {
        _id: 1,
        field_name: "Gelora Bung Karno",
        price: 400000000,
        large: "17500 m",
        rental_time: "1 day"
    },
    {
        _id: 2,
        field_name: "Gelora Bekasi Lautan Api",
        price: 250000000,
        large: "72000 m",
        rental_time: "1 day"
    },
    {
        _id: 3,
        field_name: "Stadion Pakan Sari Bogor",
        price: 150000000,
        large: "60500 m",
        rental_time: "1 day"
    },
    {
        _id: 4,
        field_name: "Stadion Kanjuruhan Malang",
        price: 300000000,
        large: "35000 m",
        rental_time: "1 day"
    },
    {
        _id: 5,
        field_name: "Gelora Sriwijaya",
        price: 350000000,
        large: "40000 m",
        rental_time: "1 day"
    }
]);

// Update 1 (single) data at Lapangan Collections
db.lapangan.updateOne(
    {_id: 2}, 
    {$set: {
        field_name: "Gelora Bandung Lautan Api"
    }}
)

// Delete 1 (single) data at Lapangan Collections
db.lapangan.remove(
    {_id: 4}
);

// Insert document to orders collections
db.orders.insertOne({
    _id: new ObjectId(),
    team_name: "Persib",
    total: 650000000,
    date: new Date(),
    items: [
        {
            field_id: 1,
            field_name: "Gelora Bandung Lautan Api",
            price: 250000000,
            rental_time: "1 day"
        },
        {
            field_id: 2,
            field_name: "Gelora Bung Karno",
            price: 400000000,
            rental_time: "1 day"
        }
    ]
});

// Insert document orders to orders collections
db.orders.insertOne({
    _id: new ObjectId(),
    team_name: "Persija",
    total: 550000000,
    date: new Date(),
    items: [
        {
            field_id: 1,
            field_name: "Gelora Bung Karno",
            price: 400000000,
            rental_time: "1 day"
        },
        {
            field_id: 2,
            field_name: "Stadion Pakan Sari Bogor",
            price: 150000000,
            rental_time: "1 day"
        }
    ]
});

// Insert document to orders collections
db.orders.insertOne({
    _id: new ObjectId(),
    team_name: "PSS Seleman",
    total: 650000000,
    date: new Date(),
    items: [
        {
            field_id: 1,
            field_name: "Stadion Kanjuruhan Malang",
            price: 300000000,
            rental_time: "1 day"
        },
        {
            field_id: 2,
            field_name: "Gelora Sriwijaya",
            price: 350000000,
            rental_time: "1 day"
        }
    ]
});

// Update 1 (single) data at orders collection
db.orders.updateOne(
    {team_name: "PSS Seleman"}, 
    {$set: {
        team_name: "Bali United"
    }}
)

// Delete 1 (single) data at orders collections
db.orders.remove(
    {team_name: "Bali United"}
);

// Menampilkan Laporan rekap pendapatan perhari, perbulan, dan pertahun
db.orders.aggregate(
    [
      { $group: { 
          _id: { 
              day: { $dayOfYear: "$date"}, 
              year: { $year: "$date" } },
              pendapatan_perhari: { $sum: { $multiply: [ "$total", 1 ] } },
              pendapatan_perbulan: { $sum: { $multiply: [ "$total", 30 ] } },
              pendapatan_tahun: { $sum: { $multiply: [ "$total", 365 ] } },
              count: { $sum: 1 },
        }
    }
    ]
 ).pretty()

// Menampilkan Laporan rekap total bayar dari per-item atau per-customers
 db.orders.aggregate([
    { $project: {
        team_name: 1,
        items: 1,
        total_bayar: { $multiply: [ "$total", 1 ] }
        
      }
    }
 ]).pretty()