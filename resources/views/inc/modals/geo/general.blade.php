<div id="general-modal"
     class="modal fade"
     tabindex="-1"
     role="dialog"
     aria-labelledby="general-modal"
     aria-hidden="true"
>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">

                <form id="color-form" class="hidden">
                    <div class="form-group">
                        <label for="selected-color">Select color</label>
                        <select class="form-control" id="selected-color">
                            <option>red</option>
                            <option>orange</option>
                            <option>yellow</option>
                            <option>green</option>
                            <option>blue</option>
                        </select>
                        <button type="button" id="selected-color-button" class="btn btn-primary">Confirm</button>
                    </div>
                </form>

                <form id="json-form" class="hidden">
                    <div class="form-group">
                        <label for="upload-json">Select file for upload</label>
                        <input type="file" class="form-control-file" id="upload-json">
                    </div>
                    <button type="button" id="cancel-upload" class="btn btn-primary">Cancel</button>
                    <button type="button" id="perform-upload" class="btn btn-primary">Upload</button>
                </form>

                <div id="table-container" class="hidden">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Address</th>
                            <th scope="col">Lat</th>
                            <th scope="col">Long</th>
                        </tr>
                        </thead>
                        <tbody id="coords-renderer"></tbody>
                    </table>
                    <button type="button" id="close-lassoo" class="btn btn-secondary">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>