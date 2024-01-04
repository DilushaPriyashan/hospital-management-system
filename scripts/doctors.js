addDoctor = () => {
    const tempDoctor = {
        name: $('#name').val(),
        specialization: $('#specialization').val(),
        contact: $('#contact').val(),
        availability: $('#availability').val(),
        details: $('#details').val(),
    };
    console.log(tempDoctor);

    const database = firebase.firestore();
    database
        .collection('doctors')
        .add(tempDoctor)
        .then((response) => {
            console.log(response);
            loadDoctors();
            toastr.success('Success!', 'New doctor added.');

            // Clear the input fields
            $('#name').val('');
            $('#specialization').val('');
            $('#contact').val('');
            $('#availability').val('');
            $('#details').val('');

        }).catch((error) => {
            console.log(error);
        });
}


const loadDoctors = () => {
    $('#table-body').empty();

    const firestore = firebase.firestore();
    firestore
        .collection('doctors')
        .get()
        .then((result) => {
            result.forEach((records) => {
                const data = records.data();
                const row = `
            <tr>
                <td>${records.id}</td>
                <td>${data.name}</td>
                <td>${data.specialization}</td>
                <td>${data.contact}</td>
                <td>${data.availability}</td>
                <td>${data.details}</td>
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
    doctorId = id;
    const firestore = firebase.firestore();

    firestore
        .collection('doctors')
        .doc(doctorId)
        .get().then((response) => {
            if (response.exists) {
                const data = response.data();
                $('#name').val(data.name);
                $('#specialization').val(data.specialization);
                $('#contact').val(data.contact);
                $('#availability').val(data.availability);
                $('#details').val(data.details);
            }
        })
}

const updateDoctor = () => {
    if (doctorId) {
        const firestore = firebase.firestore();
        firestore
            .collection('doctors')
            .doc(doctorId)
            .update({
                name: $('#name').val(),
                specialization: $('#specialization').val(),
                contact: $('#contact').val(),
                availability: $('#availability').val(),
                details: $('#details').val(),
            }).then(() => {
                doctorId = undefined;
                loadDoctors();
                toastr.success('Success!', 'Doctor details updated.');
                // Clear the input fields
                $('#name').val('');
                $('#specialization').val('');
                $('#contact').val('');
                $('#availability').val('');
                $('#details').val('');
            })
    }
}

const deleteData = (id) => {
    if (confirm('Are you sure?')) {
        const firestore = firebase.firestore();

        firestore
            .collection('doctors')
            .doc(id)
            .delete()
            .then(() => {
                toastr.error('Success!', 'Doctor details deleted.');
                doctorIdId = undefined;
                loadDoctors();
            })
    }

}

