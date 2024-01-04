addPatient = () => {
    const tempPatient = {
        name: $('#name').val(),
        age: $('#age').val(),
        gender: $('#gender').val(),
        contact: $('#contact').val(),
        history: $('#history').val(),
    };
    console.log(tempPatient);

    const database = firebase.firestore();
    database
        .collection('patients')
        .add(tempPatient)
        .then((response) => {
            console.log(response);
            loadPatients();
            toastr.success('Success!', 'New patient added.');

            // Clear the input fields
            $('#name').val('');
            $('#age').val('');
            $('#gender').val('');
            $('#contact').val('');
            $('#history').val('');

        }).catch((error) => {
            console.log(error);
        });
}


const loadPatients = () => {
    $('#table-body').empty();

    const firestore = firebase.firestore();
    firestore
        .collection('patients')
        .get()
        .then((result) => {
            result.forEach((records) => {
                const data = records.data();
                const row = `
            <tr>
                <td>${records.id}</td>
                <td>${data.name}</td>
                <td>${data.age}</td>
                <td>${data.gender}</td>
                <td>${data.contact}</td>
                <td>${data.history}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onClick="deleteData('${records.id}')">Delete</button>
                    <button class="btn btn-success btn-sm" onClick="updateData('${records.id}')">Update</button>
                    
                </td>
            </tr>
            `;

                $('#table-body').append(row);
            });
        });
}

const updateData = (id) => {
    patientId = id;
    const firestore = firebase.firestore();

    firestore
        .collection('patients')
        .doc(patientId)
        .get().then((response) => {
            if (response.exists) {
                const data = response.data();
                $('#name').val(data.name);
                $('#age').val(data.age);
                $('#gender').val(data.gender);
                $('#contact').val(data.contact);
                $('#history').val(data.history);
            }
        })
}

const updatePatient = () => {
    if (patientId) {
        const firestore = firebase.firestore();
        firestore
            .collection('patients')
            .doc(patientId)
            .update({
                name: $('#name').val(),
                age: $('#age').val(),
                contact: $('#contact').val(),
                gender: $('#gender').val(),
                history: $('#history').val(),
            }).then(() => {
                patientId = undefined;
                loadPatients();
                toastr.success('Success!', 'Patient details updated.');

                // Clear the input fields
                $('#name').val('');
                $('#age').val('');
                $('#gender').val('');
                $('#contact').val('');
                $('#history').val('');
            })
    }
}

const deleteData = (id) => {
    if (confirm('Are you sure?')) {
        const firestore = firebase.firestore();

        firestore
            .collection('patients')
            .doc(id)
            .delete()
            .then(() => {
                toastr.error('Success!', 'Patient details deleted.');
                doctorIdId = undefined;
                loadPatients();
            })
    }

}

